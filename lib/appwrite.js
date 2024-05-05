import { Account, Client, ID, Avatars, Databases } from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.jsm.aora",
  projectId: "6637aef900248f71a9d0",
  databaseId: "6637b0e300117a891426",
  userCollectionId: "6637b10300104f18602d",
  videoCollectionId: "6637b12e0023b1e8bf35",
  storageId: "6637b29a001b596f9f85",
};


const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client)

export const createUser = async (email, password) => {
  // Register User
  try {
    const newAccount = await account.create(
      ID.unique(),
      email, 
      password
    )

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials()

    await signIn(email, password)

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId, 
      appwriteConfig.userCollectionId, 
      ID.unique(), 
      {
        accountId: newAccount.$id,
        email,
        avatar: avatarUrl
      }
    )

    return newUser;

  } catch (error) {
    console.log(error);
  }
};

export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password)

    return session;
  }
  catch (error) {
    throw new Error(error);
  }
}
