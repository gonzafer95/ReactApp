import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toDos: [],
  filteredToDos: [],
  alimentos: [],
  alimentosCalorias: [],
};

export const todosSlice = createSlice({
  name: "todosSlice",
  initialState: initialState,
  reducers: {
    onLoadToDos: (state, action) => {
      const { payload } = action;
      state.toDos = payload;
      state.filteredToDos = payload;
    },
    onAddToDo: (state, action) => {
      const { payload } = action;
      state.toDos = [...state.toDos, payload];
      state.filteredToDos = state.toDos;
    },
    onFilterToDos: (state, action) => {
      const { payload } = action;
      const { toDos } = state;

      const mesActual = new Date().getMonth()+1;

      const yearActual = new Date().getFullYear();
      
      const fechaActual = new Date();

      const primerDiaSemana = new Date(fechaActual);
      primerDiaSemana.setDate(primerDiaSemana.getDate() - fechaActual.getDay());

      // const fechaLimiteUltimaSemana = new Date(fechaActual);
      // fechaLimiteUltimaSemana.setDate(fechaLimiteUltimaSemana.getDate() - 7);

      if (payload === 0) {
        // Última semana
        state.filteredToDos = toDos.filter((todo) => new Date(todo.fecha).getDate() >= primerDiaSemana.getDate() && new Date(todo.fecha).getDate() <= fechaActual.getDate() && new Date(todo.fecha).getMonth()+1 === mesActual && new Date(todo.fecha).getFullYear() === yearActual);
      } else if (payload === 1) {
        // Último mes
        state.filteredToDos = toDos.filter((todo) => new Date(todo.fecha).getMonth()+1 === mesActual && new Date(todo.fecha).getFullYear() === yearActual);
      } else {
        // Todos
        state.filteredToDos = toDos;
      }
    },
    onLoadAlimentos: (state, action) => {
      const { payload } = action;
      state.alimentos = payload;
    },
    onLoadAlimentosCalorias: (state, action) => {
      const { payload } = action;
      state.alimentosCalorias = payload;
    },
  },
});

export const { onLoadToDos, onAddToDo, onFilterToDos, onLoadAlimentos, onLoadAlimentosCalorias } = todosSlice.actions;
export default todosSlice.reducer;
