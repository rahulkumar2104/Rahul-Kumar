import { users, contactSubmissions, type User, type InsertUser, type ContactSubmission, type InsertContactSubmission } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getAllContactSubmissions(): Promise<ContactSubmission[]>;
}

// In-memory storage for development/testing when DATABASE_URL is not set
class InMemoryStorage implements IStorage {
  private usersStore: Map<string, User> = new Map();
  private contactSubmissionsStore: Map<string, ContactSubmission> = new Map();

  async getUser(id: string): Promise<User | undefined> {
    return this.usersStore.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    for (const user of Array.from(this.usersStore.values())) {
      if (user.username === username) return user;
    }
    return undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const user: User = {
      id: Math.random().toString(36).substring(7),
      username: insertUser.username,
      password: insertUser.password,
    };
    this.usersStore.set(user.id, user);
    return user;
  }

  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const contactSubmission: ContactSubmission = {
      id: Math.random().toString(36).substring(7),
      ...submission,
      createdAt: new Date(),
    };
    this.contactSubmissionsStore.set(contactSubmission.id, contactSubmission);
    console.log("✅ Contact submission saved (in-memory):", contactSubmission);
    return contactSubmission;
  }

  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissionsStore.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }
}

// Database storage for production
class DatabaseStorage implements IStorage {
  private db: any;

  constructor(db: any) {
    this.db = db;
  }

  async getUser(id: string): Promise<User | undefined> {
    const [user] = await this.db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await this.db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await this.db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const [contactSubmission] = await this.db
      .insert(contactSubmissions)
      .values(submission)
      .returning();
    return contactSubmission;
  }

  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    return await this.db.select().from(contactSubmissions).orderBy(contactSubmissions.createdAt);
  }
}

// Use in-memory storage if DATABASE_URL is not set
let storage: IStorage;

if (process.env.DATABASE_URL) {
  const { db } = require('./db');
  storage = new DatabaseStorage(db);
} else {
  console.warn("⚠️  DATABASE_URL not set. Using in-memory storage for development/testing.");
  storage = new InMemoryStorage();
}

export { storage };
