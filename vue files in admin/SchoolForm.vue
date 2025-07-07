<template>
  <div id="add-content" class="h-full bg-white rounded-lg shadow-sm p-8 space-y-6">
    <h2 class="text-2xl font-bold text-usepmaroon mb-4">Add School Information</h2>

    <!-- College Form -->
    <div class="border border-gray-200 rounded-lg p-4">
      <h3 class="text-lg font-semibold text-gray-800 mb-3">Add College</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label for="college" class="block text-sm font-medium text-gray-700 mb-1">College</label>
          <input
              type="text"
              id="college"
              v-model="collegeForm.name"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-usepmaroon focus:border-usepmaroon"
          >
        </div>
      </div>
      <div class="flex justify-end mt-4">
        <button
            @click="saveCollege"
            class="bg-usepmaroon text-white px-4 py-2 rounded-md hover:bg-usepmaroon-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-usepmaroon"
        >
          Save
        </button>
      </div>
    </div>

    <!-- Department Form -->
    <div class="border border-gray-200 rounded-lg p-4">
      <h3 class="text-lg font-semibold text-gray-800 mb-3">Add Department</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label for="department" class="block text-sm font-medium text-gray-700 mb-1">Department</label>
          <input
              type="text"
              id="department"
              v-model="departmentForm.name"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-usepmaroon focus:border-usepmaroon"
          >
        </div>
        <div>
          <label for="department-college" class="block text-sm font-medium text-gray-700 mb-1">College</label>
          <select
              id="department-college"
              v-model="departmentForm.collegeId"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-usepmaroon focus:border-usepmaroon"
          >
            <option value="">Select College</option>
            <option v-for="college in colleges" :key="college.id" :value="college.id">
              {{ college.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="flex justify-end mt-4">
        <button
            @click="saveDepartment"
            class="bg-usepmaroon text-white px-4 py-2 rounded-md hover:bg-usepmaroon-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-usepmaroon"
        >
          Save
        </button>
      </div>
    </div>

    <!-- Program Form - Specific Layout -->
    <div class="border border-gray-200 rounded-lg p-4">
      <h3 class="text-lg font-semibold text-gray-800 mb-3">Add Program</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- First Row: Program Name and Dropdown -->
        <div class="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="program" class="block text-sm font-medium text-gray-700 mb-1">Program</label>
            <input
                type="text"
                id="program"
                v-model="programForm.name"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-usepmaroon focus:border-usepmaroon"
            >
          </div>
          <div>
            <label for="program-dropdown" class="block text-sm font-medium text-gray-700 mb-1">Program Dropdown</label>
            <select
                id="program-dropdown"
                v-model="programForm.type"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-usepmaroon focus:border-usepmaroon"
            >
              <option value="">Select Program</option>
              <option value="Undergraduate">Undergraduate</option>
              <option value="Graduate">Graduate</option>
              <option value="Doctorate">Doctorate</option>
            </select>
          </div>
        </div>

        <!-- Second Row: Acronym and College -->
        <div>
          <label for="program-acronym" class="block text-sm font-medium text-gray-700 mb-1">Acronym</label>
          <input
              type="text"
              id="program-acronym"
              v-model="programForm.acronym"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-usepmaroon focus:border-usepmaroon"
          >
        </div>
        <div>
          <label for="program-college" class="block text-sm font-medium text-gray-700 mb-1">College</label>
          <select
              id="program-college"
              v-model="programForm.collegeId"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-usepmaroon focus:border-usepmaroon"
          >
            <option value="">Select College</option>
            <option v-for="college in colleges" :key="college.id" :value="college.id">
              {{ college.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="flex justify-end mt-4">
        <button
            @click="saveProgram"
            class="bg-usepmaroon text-white px-4 py-2 rounded-md hover:bg-usepmaroon-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-usepmaroon"
        >
          Save
        </button>
      </div>
    </div>

    <!-- Office Form -->
    <div class="border border-gray-200 rounded-lg p-4">
      <h3 class="text-lg font-semibold text-gray-800 mb-3">Add Office</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label for="office" class="block text-sm font-medium text-gray-700 mb-1">Office</label>
          <input
              type="text"
              id="office"
              v-model="officeForm.name"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-usepmaroon focus:border-usepmaroon"
          >
        </div>
        <div>
          <label for="office-campus" class="block text-sm font-medium text-gray-700 mb-1">Campus</label>
          <select
              id="office-campus"
              v-model="officeForm.campusId"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-usepmaroon focus:border-usepmaroon"
          >
            <option value="">Select Campus</option>
            <option v-for="campus in campuses" :key="campus.id" :value="campus.id">
              {{ campus.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="flex justify-end mt-4">
        <button
            @click="saveOffice"
            class="bg-usepmaroon text-white px-4 py-2 rounded-md hover:bg-usepmaroon-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-usepmaroon"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'SchoolForm',
  setup() {
    // Sample data - in a real app, this would come from an API
    const colleges = ref([
      { id: 1, name: 'College of Engineering' },
      { id: 2, name: 'College of Arts and Sciences' },
      { id: 3, name: 'College of Business Administration' }
    ]);

    const campuses = ref([
      { id: 1, name: 'Tagum-Mabini Campus' },
      { id: 2, name: 'Obrero Campus' },
      { id: 3, name: 'Mintal Campus' }
    ]);

    // Form data
    const collegeForm = ref({
      name: ''
    });

    const departmentForm = ref({
      name: '',
      collegeId: ''
    });

    const programForm = ref({
      name: '',
      type: '',
      acronym: '',
      collegeId: ''
    });

    const officeForm = ref({
      name: '',
      campusId: ''
    });

    // Save methods
    const saveCollege = () => {
      console.log('Saving college:', collegeForm.value);
      // Add API call to save college
    };

    const saveDepartment = () => {
      console.log('Saving department:', departmentForm.value);
      // Add API call to save department
    };

    const saveProgram = () => {
      console.log('Saving program:', programForm.value);
      // Add API call to save program
    };

    const saveOffice = () => {
      console.log('Saving office:', officeForm.value);
      // Add API call to save office
    };

    return {
      colleges,
      campuses,
      collegeForm,
      departmentForm,
      programForm,
      officeForm,
      saveCollege,
      saveDepartment,
      saveProgram,
      saveOffice
    };
  }
};
</script>

<style scoped>
/* Add any component-specific styles here */
</style>