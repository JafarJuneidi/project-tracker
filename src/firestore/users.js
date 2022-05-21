import { firestore, GENERAL_CHATROOM } from './index';
import {
  addChatRoomToAdmin,
  createChatRoom,
  deleteChatRoom,
  removeChatRoomFromAdmin,
} from './chatRooms';

export const createUserDocument = (user, additionalData) => {
  if (!user) return;

  firestore
    .collection('users')
    .doc(user.uid)
    .set({
      email: user.email,
      ...additionalData,
      groupId: null,
      createdAt: new Date(),
      lastModified: new Date(),
      chatRooms: [GENERAL_CHATROOM, user.uid],
    })
    .then(() => {
      console.log('updating admin');
      addChatRoomToAdmin(user.uid);

      createChatRoom(user.uid, additionalData.name);

      console.log('new User document successfully written!');
    })
    .catch((error) => {
      console.error('Error writing User document: ', error);
    });
};

export const getUserDocument = async (userId) => {
  try {
    const user = await firestore.collection('users').doc(userId).get();
    if (user.exists) return { id: userId, ...user.data() };
    else console.log('No such document!');
  } catch (error) {
    console.log('error getting user document', error);
  }
};

export const updateUser = async (userId, user) => {
  const groupRef = firestore.collection('users').doc(userId);
  await groupRef.update(user);
  console.log('User updated successfully');
};

export const getStudentsFromDb = async () => {
  try {
    const querySnapshot = await firestore.collection('users').get();
    const students = [];
    querySnapshot.forEach((doc) => {
      if (!doc.data().instructor) {
        students.push({ id: doc.id, ...doc.data() });
      }
    });
    return students;
  } catch (error) {
    console.log('error fetching user documents', error);
  }
};

export const getStudentFromDb = async (userId) => {
  try {
    const doc = await firestore.collection('users').doc(userId).get();
    return { id: userId, ...doc.data() };
  } catch (error) {
    console.log('error fetching user documents', error);
  }
};

export const deleteUser = async (userId) => {
  try {
    await firestore.collection('users').doc(userId).delete();
    deleteChatRoom(userId);
    removeChatRoomFromAdmin(userId);
    console.log('User document successfully deleted!');
  } catch (error) {
    console.error('Error removing user document: ', error);
  }
};
