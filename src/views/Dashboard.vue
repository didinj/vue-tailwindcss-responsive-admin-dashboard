<template>
  <div>
    <!-- Title -->
    <h2 class="text-2xl font-bold mb-6">Dashboard</h2>

    <!-- Stats Cards -->
    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
      <div class="bg-white p-6 rounded-xl shadow">
        <p class="text-sm font-medium text-gray-500">Total Users</p>
        <p class="text-2xl font-bold mt-2">1,245</p>
      </div>

      <div class="bg-white p-6 rounded-xl shadow">
        <p class="text-sm font-medium text-gray-500">Revenue</p>
        <p class="text-2xl font-bold mt-2">$32,450</p>
      </div>

      <div class="bg-white p-6 rounded-xl shadow">
        <p class="text-sm font-medium text-gray-500">Active Sessions</p>
        <p class="text-2xl font-bold mt-2">534</p>
      </div>

      <div class="bg-white p-6 rounded-xl shadow">
        <p class="text-sm font-medium text-gray-500">Bounce Rate</p>
        <p class="text-2xl font-bold mt-2">27%</p>
      </div>
    </div>

    <!-- Chart -->
    <div class="bg-white p-6 rounded-xl shadow mb-8">
      <h3 class="text-lg font-semibold mb-4">Monthly Users Growth</h3>
      <apexchart
        width="100%"
        type="line"
        :options="chartOptions"
        :series="series"
      />
    </div>

    <!-- Recent Activity -->
    <div class="bg-white p-6 rounded-xl shadow">
      <h3 class="text-lg font-semibold mb-4">Recent Activity</h3>
      <ul class="space-y-4">
        <li class="flex items-start">
          <span class="w-2 h-2 mt-2 rounded-full bg-blue-500"></span>
          <p class="ml-3 text-gray-700">
            New user <strong>John Doe</strong> registered.
            <span class="block text-sm text-gray-500">2 hours ago</span>
          </p>
        </li>
        <li class="flex items-start">
          <span class="w-2 h-2 mt-2 rounded-full bg-green-500"></span>
          <p class="ml-3 text-gray-700">
            Payment of <strong>$250</strong> received.
            <span class="block text-sm text-gray-500">5 hours ago</span>
          </p>
        </li>
        <li class="flex items-start">
          <span class="w-2 h-2 mt-2 rounded-full bg-yellow-500"></span>
          <p class="ml-3 text-gray-700">
            Server CPU usage high.
            <span class="block text-sm text-gray-500">1 day ago</span>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const series = ref([
  {
    name: 'Users',
    data: [120, 200, 340, 280, 450, 600, 750, 900, 1200, 1400, 1600, 1800],
  },
])

const chartOptions = ref({
  chart: {
    id: 'users-growth',
    toolbar: { show: false },
  },
  xaxis: {
    categories: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ],
  },
  colors: ['#3b82f6'], // Tailwind blue-500
  stroke: {
    curve: 'smooth',
    width: 3,
  },
  dataLabels: {
    enabled: false,
  },
  grid: {
    borderColor: '#e5e7eb', // Tailwind gray-200
  },
})
</script>
