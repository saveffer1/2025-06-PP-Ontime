<template>
  <table border="1" cellpadding="4" cellspacing="0">
    <thead>
      <tr>
        <th style="text-align: left">id</th>
        <th style="text-align: left">name</th>
        <th style="text-align: left">age</th>
        <th style="text-align: left">status</th>
        <th style="text-align: left">Edit</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.id">
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.age }}</td>
        <td>{{ item.status }}</td>
        <td>
          <button v-if="!item.editing" @click="item.editing = true">
            Edit
          </button>
          <template v-else>
            <input
              v-model="item.name"
              style="width: 100px;"
              @keyup.enter="item.editing = false"
            />
            <button @click="item.editing = false">X</button>
          </template>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Person {
  id: number
  name: string
  age: number
  status: 'Old' | 'Young'
  editing: boolean
}

const items = ref<Person[]>([
  { id: 1, name: 'Cerberus',   age: 50, status: 'Old',   editing: false },
  { id: 2, name: 'Hector',     age: 45, status: 'Old',   editing: false },
  { id: 3, name: 'Perseus',    age: 23, status: 'Young', editing: false },
  { id: 4, name: 'Pegasus',    age: 12, status: 'Young', editing: false },
  { id: 5, name: 'Hippolytos', age: 87, status: 'Old',   editing: false },
])
</script>
