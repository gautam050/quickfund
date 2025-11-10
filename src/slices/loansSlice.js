import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../firebase';
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  getDoc,
} from 'firebase/firestore';

export const createLoanApplication = createAsyncThunk('loans/create', async ({ application }, thunkAPI) => {
  try {
    const docRef = await addDoc(collection(db, 'loans'), application);
    const created = { id: docRef.id, ...application };
    return created;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

export const fetchUserLoans = createAsyncThunk('loans/fetchUser', async ({ uid }, thunkAPI) => {
  try {
    const q = query(collection(db, 'loans'), where('applicantUid', '==', uid));
    const snap = await getDocs(q);
    const arr = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    return arr;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

export const fetchAllLoans = createAsyncThunk('loans/fetchAll', async (_, thunkAPI) => {
  try {
    const snap = await getDocs(collection(db, 'loans'));
    const arr = snap.docs.map(d=>({ id: d.id, ...d.data() }));
    return arr;
  } catch(err){
    return thunkAPI.rejectWithValue(err.message);
  }
});

export const updateLoanStatus = createAsyncThunk('loans/updateStatus', async ({ id, status }, thunkAPI) => {
  try {
    const docRef = doc(db, 'loans', id);
    await updateDoc(docRef, { status, updatedAt: Date.now() });
    const updatedDoc = await getDoc(docRef);
    return { id, ...updatedDoc.data() };
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

const loansSlice = createSlice({
  name: 'loans',
  initialState: {
    applications: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createLoanApplication.fulfilled, (state, action) => {
        state.applications.push(action.payload);
      })
      .addCase(fetchUserLoans.fulfilled, (state, action) => {
        state.applications = action.payload;
      })
      .addCase(fetchAllLoans.fulfilled, (state, action) => {
        state.applications = action.payload;
      })
      .addCase(updateLoanStatus.fulfilled, (state, action) => {
        state.applications = state.applications.map(a => (a.id === action.payload.id ? action.payload : a));
      });
  },
});

export default loansSlice.reducer;
