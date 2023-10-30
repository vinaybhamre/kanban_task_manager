import { createSlice } from "@reduxjs/toolkit";
import data from "../../../public/data.json";

let currentID = 0;

const { boards } = data;

const initialBoardState = boards.map((board) => {
  return {
    id: currentID++,
    title: board.title,
    columns: board.columns.map((column) => {
      return {
        id: currentID++,
        title: column.title,
        tasks: column.tasks.map((task) => {
          return {
            id: currentID++,
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            date: task.date,
          };
        }),
      };
    }),
  };
});

const initialState = {
  boards: initialBoardState,
  activeBoardIndex: 0,
  activeColumn: null,
  activeTask: null,
  dragState: initialBoardState,
};

const boardSlice = createSlice({
  name: "kanban_board",
  initialState: initialState,
  reducers: {
    setActiveBoardIndex: (state, action) => {
      state.activeBoardIndex = action.payload;
    },
    addBoard: (state, action) => {
      const newBoard = {
        id: currentID++,
        title: action.payload,
        columns: [],
      };
      state.boards = [...state.boards, newBoard];
    },
    editBoardName: (state, action) => {
      const editedName = action.payload;
      state.boards[state.activeBoardIndex].title = editedName;
    },
    deleteBoard: (state, action) => {
      state.activeBoardIndex = 0;
      state.boards = state.boards.filter(
        (board) => board.id !== action.payload,
      );
    },
    addColumn: (state, action) => {
      const newColumn = {
        id: currentID++,
        title: action.payload.columnName,
        tasks: [],
      };
      state.boards[state.activeBoardIndex] = {
        ...state.boards[state.activeBoardIndex],
        columns: [...state.boards[state.activeBoardIndex].columns, newColumn],
      };
    },
    editColumn: (state, action) => {
      const editedColumn = action.payload.columnId;
      state.boards[state.activeBoardIndex].columns = state.boards[
        state.activeBoardIndex
      ].columns.map((column) => {
        if (column.id === editedColumn) {
          return { ...column, title: action.payload.title };
        }
        return column;
      });
    },
    deleteColumn: (state, action) => {
      state.boards[state.activeBoardIndex] = {
        ...state.boards[state.activeBoardIndex],
        columns: state.boards[state.activeBoardIndex].columns.filter(
          (column) => column.id !== action.payload,
        ),
      };
    },
  },
});

export default boardSlice.reducer;

export const {
  setActiveBoardIndex,
  addBoard,
  editBoardName,
  deleteBoard,
  addColumn,
  editColumn,
  deleteColumn,
} = boardSlice.actions;
