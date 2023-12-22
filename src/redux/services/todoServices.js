import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const todoService = createApi({
    reducerPath: 'todo',
    baseQuery: fetchBaseQuery({ baseUrl: "https://657fb8876ae0629a3f538d75.mockapi.io/", }),
    endpoints: (builder) => ({
        // To get all todos
        getAllTodos: builder.query({
            query: () => ({
                url: "todos",
                method: "GET"
            }),
        }),

        // To get a todo
        getTodo: builder.query({
            query: (id) => ({
                url: "todos/" + id,
                method: "GET"
            }),
        }),

        // To add a new todo
        addTodo: builder.mutation({
            query: (payload) => ({
                url: "todos",
                method: "POST",
                body: payload
            })
        }),

        // To update a new todo
        updateTodo: builder.mutation({
            query: (payload) => ({
                url: "todos/" + payload.id,
                method: "PUT",
                body: payload.body
            })
        }),

        // To delete a todo
        deleteTodo: builder.mutation({
            query: (id) => ({
                url: "todos/" + id,
                method: "DELETE"
            })
        }),
    }),
});

export const { useGetAllTodosQuery, useLazyGetAllTodosQuery, useAddTodoMutation, useUpdateTodoMutation, useGetTodoQuery, useLazyGetTodoQuery, useDeleteTodoMutation } = todoService;