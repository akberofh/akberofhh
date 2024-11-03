import { apiSlice } from './apiSlice';

const TODOS_URL = '/api/product';

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => ({
        url: `${TODOS_URL}/`,
      }),
    }),
    addTodo: builder.mutation({
      query: (todo) => ({
        url: `${TODOS_URL}/`,
        method: 'POST',
        body: todo,
      }),
    }),
    updateTodo: builder.mutation({
      query: (id) => ({
        url: `${TODOS_URL}/${id}`,
        method: 'PUT',
        
      }),
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `${TODOS_URL}/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useGetTodosQuery, useAddTodoMutation, useDeleteTodoMutation, useUpdateTodoMutation } = productApiSlice;
