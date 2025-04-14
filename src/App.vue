<template>
  <div>
    <h1>Daftar Tugas dari D1</h1>
    <ul v-if="produk.length">
      <li v-for="task in produk" :key="task.id">{{ task.task }}</li>
    </ul>
    <input v-model="newTask" placeholder="Tambah tugas baru" />
    <button @click="addTask">Tambah</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tasks: [],
      newTask: '',
    }
  },
  async mounted() {
    const response = await fetch('/api/produks')
    this.tasks = await response.json()
  },
  methods: {
    async addTask() {
      await fetch('/api/produks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: this.newTask }),
      })
      this.newTask = ''
      const response = await fetch('/api/produks')
      this.tasks = await response.json()
    },
  },
}
</script>
