import axios from "axios";
import { email, number, z } from "zod";

export interface LoginDataInterface {
  email: string;
  password: string;
}

export interface SignupDataInterface {
  name:string;
  email: string;
  password: string;
}

export interface DataInterface{
  name: string;
  email: string;
  userId: number;
}
 
export const SignupSchema = z.object({
  name: z.string(),
  email: z.email({ message: "Invalid email address" }),
  password: z.string().min(4, { message: "Password must be at least 6 characters long" }),
});

export const LoginSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z.string().min(4, { message: "Password must be at least 6 characters long" }),
})





export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL ,
   withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});


export  interface UserState {
  isLoggedIn: boolean;
  isLoading: boolean;
  token: string;
  userId: string;
  name: string;
  email: string;
  error: string;
}

export interface Credentials {
  email: string;
  password: string;
}

class Node<K, V> {
  key: K;
  value: V;
  prev: Node<K, V> | null;
  next: Node<K, V> | null;

  constructor(key?: K, value?: V) {
    this.key = key as K;
    this.value = value as V;
    this.prev = null;
    this.next = null;
  }
}

export class LRUCache<K, V> {
  private map: Map<K, Node<K, V>>;
  private head: Node<K, V>;
  private tail: Node<K, V>;
  private size: number;

  constructor(private limit: number) {
    this.map = new Map();
    this.head = new Node<K, V>();
    this.tail = new Node<K, V>();
    this.head.next = this.tail;
    this.tail.prev = this.head;
    this.size = 0;
  }

  addNode(node: Node<K, V>) {
    node.prev = this.head;
    node.next = this.head.next;
    if (this.head.next) this.head.next.prev = node;
    this.head.next = node;
  }

  removeNode(node: Node<K, V>) {
    if (node.prev) node.prev.next = node.next;
    if (node.next) node.next.prev = node.prev;
    node.prev = node.next = null;
  }

  moveToFront(node: Node<K, V>) {
    this.removeNode(node);
    this.addNode(node);
  }

  get(key: K): V | undefined {
    const node = this.map.get(key);
    if (!node) return undefined;
    this.moveToFront(node);
    return node.value;
  }

  set(key: K, value: V) {
    const node = this.map.get(key);
    if (node) {
      node.value = value;
      this.moveToFront(node);
    } else {
      const newNode = new Node(key, value);
      this.addNode(newNode);
      this.map.set(key, newNode);
      this.size++;
      if (this.size > this.limit) {
        const lruNode = this.tail.prev as Node<K, V>;
        this.removeNode(lruNode);
        this.map.delete(lruNode.key);
        this.size--;
      }
    }
  }
    keys(): K[] {
    const result: K[] = [];
    let current = this.head.next;
    while (current && current !== this.tail) {
      result.push(current.key);
      current = current.next;
    }
    return result;
  }

  getLru(): V | undefined {
    const lruNode = this.tail.prev;
    if (!lruNode) return undefined;
    return lruNode.value;
  }

  getMru(): V | undefined {
    const mruNode = this.head.next;
    if (!mruNode) return undefined;
    return mruNode.value;
  }

  has(key: K): boolean {
    return this.map.has(key);
  }

  clear() {
    this.map.clear();
    this.head.next = this.tail;
    this.tail.prev = this.head;
    this.size = 0;
  }
}