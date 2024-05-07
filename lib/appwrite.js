import {
  Account,
  Client,
  ID,
  Avatars,
  Databases,
  Query,
} from "react-native-appwrite";

import { appwriteConfig } from '../db/config'

const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export async function createUser(email, password) {
  // Register User
  try {
    const newAccount = await account.create(ID.unique(), email, password);

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials();

    await signIn(email, password);

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    console.log(error);
  }
}

export async function signIn(email, password) {
  try {
    // signOut()
    await account.deleteSession('current').catch((error) => console.log(error))
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
}

export async function signOut() {
  try {
      await account.deleteSession('current')

  } catch (error) {
      console.error("Error signing out:", error);
      throw error;
  }
}

export async function getAllPosts() {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId
    )

    return posts.documents;
  }
  catch(error) {
    throw new Error(error)
  }
}

export async function getLatestPosts() {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      Query.orderDesc('$createdAt', Query.limit(7))
    )

    return posts.documents;
  }
  catch(error) {
    throw new Error(error)
  }
}