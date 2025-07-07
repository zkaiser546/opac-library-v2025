<template>
  <div id="add-content" class="p-8 max-w-5xl mx-auto">
    <h2 class="text-2xl font-bold text-usepmaroon mb-4">Update School Information</h2>

    <!-- Desktop Tabs -->
    <div class="desktop-tabs bg-gray-100 rounded-lg p-1 mb-6 overflow-hidden hidden md:block">
      <div class="flex">
        <button
            v-for="tab in tabs"
            :key="tab.id"
            :data-tab="tab.id"
            @click="switchTab(tab.id)"
            class="desktop-tab flex-1 py-3 px-4 text-center"
            :class="{ 'active-tab': activeTab === tab.id }"
        >
          <i :class="tab.icon" class="mr-2"></i>{{ tab.title }}
        </button>
      </div>
    </div>

    <!-- Mobile Dropdown -->
    <div class="mobile-dropdown mb-6 block md:hidden">
      <button
          @click="toggleMobileDropdown"
          class="w-full bg-gray-100 py-3 px-4 rounded-lg flex justify-between items-center border border-gray-300"
      >
        <span id="mobile-tab-label">
          <i :class="activeTabData.icon" class="mr-2"></i>{{ activeTabData.title }}
        </span>
        <i id="dropdown-chevron" class="fas fa-chevron-down transition-transform" :class="{ 'rotate-180': showMobileDropdown }"></i>
      </button>
      <div
          id="mobile-dropdown-content"
          class="mobile-dropdown-content bg-white border border-gray-200 rounded-b-lg shadow-sm"
          :class="{ 'hidden': !showMobileDropdown }"
      >
        <button
            v-for="(tab, index) in tabs"
            :key="tab.id"
            :data-tab="tab.id"
            @click="handleMobileTabClick(tab.id)"
            class="mobile-tab-option w-full text-left py-3 px-4 flex items-center border-b border-gray-100"
        >
          <i :class="tab.icon" class="mr-3 text-usepmaroon"></i>{{ tab.title }}
          <span class="ml-auto text-usepmaroon" :class="{ 'opacity-0': activeTab !== tab.id }">
            <i class="fas fa-check"></i>
          </span>
        </button>
      </div>
    </div>

    <!-- Tab Content -->
    <div id="tab-content" class="p-4 border border-gray-200 rounded-lg">
      <h3 class="text-lg font-semibold text-usepmaroon mb-4">{{ activeTabData.title }} Management</h3>
      <div class="text-gray-600">
        <form class="space-y-4">
          <div class="flex flex-col sm:flex-row flex-wrap items-center gap-2 md:gap-4">
            <div class="relative w-full md:w-96">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <i class="fas fa-search text-gray-400"></i>
              </div>
              <input
                  type="text"
                  v-model="searchQuery"
                  class="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-usepmaroon focus:border-usepmaroon shadow-sm input-focus transition"
                  :placeholder="`Search ${activeTabData.title.toLowerCase()}...`"
                  @keyup.enter="searchItems"
              >
            </div>
            <button
                @click="searchItems"
                class="px-5 py-2.5 bg-usepmaroon text-white rounded-lg hover:bg-usepmaroon/90 flex items-center justify-center shadow-sm transition-all hover:shadow-md"
            >
              <i class="fas fa-search mr-2"></i>Search
            </button>
          </div>

          <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-usepmaroon text-white">
              <tr>
                <th
                    v-for="(header, index) in activeTabData.headers"
                    :key="index"
                    class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    :class="{ 'text-right': index === activeTabData.headers.length - 1 }"
                >
                  {{ header }}
                </th>
              </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="(item, itemIndex) in activeTabData.items" :key="itemIndex">
                <td
                    v-for="(field, fieldIndex) in activeTabData.fields"
                    :key="fieldIndex"
                    class="px-6 py-4 whitespace-nowrap"
                    :class="{ 'text-right': fieldIndex === activeTabData.fields.length - 1 }"
                >
                  <div class="text-sm font-semibold text-gray-900">{{ item[field] }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                      @click="editItem(item)"
                      class="text-usepmaroon hover:text-usepgold"
                  >
                    <i class="fas fa-edit mr-1"></i> Edit
                  </button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </form>
      </div>
    </div>

    <!-- Pagination -->
    <div class="flex items-center justify-between mt-6">
      <div class="text-sm text-gray-600">
        Showing <span class="font-medium">1</span> to <span class="font-medium">5</span> of <span class="font-medium">12</span> entries
      </div>
      <div class="flex space-x-2">
        <button
            @click="previousPage"
            class="px-3 py-1 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50"
        >
          Previous
        </button>
        <button
            v-for="page in 3"
            :key="page"
            @click="goToPage(page)"
            class="px-3 py-1 border border-gray-300 rounded-md"
            :class="{
            'bg-usepmaroon text-white hover:bg-usepmaroon/90': currentPage === page,
            'text-gray-600 hover:bg-gray-50': currentPage !== page
          }"
        >
          {{ page }}
        </button>
        <button
            @click="nextPage"
            class="px-3 py-1 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50"
        >
          Next
        </button>
      </div>
    </div>

    <!-- Save Button -->
    <div class="pt-4 flex justify-end">
      <button
          type="submit"
          @click="saveChanges"
          class="bg-usepmaroon text-white px-6 py-2 rounded hover:bg-red-900"
      >
        <i class="fas fa-save mr-2"></i>Save
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UpdateSchoolInformation',
  data() {
    return {
      searchQuery: '',
      activeTab: 'colleges',
      showMobileDropdown: false,
      currentPage: 1,
      tabs: [
        {
          id: 'colleges',
          title: 'Colleges',
          icon: 'fas fa-building',
          headers: ['College', 'Actions'],
          fields: ['name'],
          items: [
            { name: 'College of Teacher Education and Technology' },
            { name: 'College of Agriculture and Related Sciences' },
            { name: 'School of Medicine' }
          ]
        },
        {
          id: 'departments',
          title: 'Departments',
          icon: 'fas fa-sitemap',
          headers: ['Department', 'College', 'Actions'],
          fields: ['name', 'college'],
          items: [
            { name: 'Department', college: 'College of Teacher Education and Technology' },
            { name: 'Department', college: 'College of Agriculture and Related Sciences' },
            { name: 'Department', college: 'School of Medicine' }
          ]
        },
        {
          id: 'programs',
          title: 'Programs',
          icon: 'fas fa-graduation-cap',
          headers: ['Program', 'Program Acronym', 'College', 'Actions'],
          fields: ['name', 'acronym', 'college'],
          items: [
            { name: 'Bachelor of Elementary Education', acronym: 'BEED', college: 'College of Teacher Education and Technology' },
            { name: 'Bachelor of Early Childhood Education', acronym: 'BECED', college: 'College of Teacher Education and Technology' },
            { name: 'Bachelor of Secondary Education', acronym: 'BSED', college: 'College of Teacher Education and Technology' },
            { name: 'Bachelor of Science in Information Technology', acronym: 'BSIT', college: 'College of Teacher Education and Technology' },
            { name: 'Bachelor of Technical-Vocational Teacher Education', acronym: 'BTVTED', college: 'College of Teacher Education and Technology' },
            { name: 'Bachelor of Secondary in Agricultural and Biosystem Engineering', acronym: 'BSABE', college: 'College of Engineering' },
            { name: 'Bachelor of Science in Agriculture', acronym: 'BSA', college: 'College of Agriculture and Related Sciences' },
            { name: 'Bachelor of Science in Forestry', acronym: 'BSF', college: 'College of Agriculture and Related Sciences' },
            { name: 'Doctor of Medicine', acronym: 'DM', college: 'School of Medicine' }
          ]
        },
        {
          id: 'office',
          title: 'Office',
          icon: 'fas fa-briefcase',
          headers: ['Office', 'Campus', 'Actions'],
          fields: ['name', 'campus'],
          items: [
            { name: 'Office', campus: 'Tagum-Mabin(Tagun Unit)' },
            { name: 'Office', campus: 'Tagum-Mabini(Mabini Unit)' },
            { name: 'Office', campus: 'Tagum-Mabini (Tagum Unit)' }
          ]
        }
      ]
    }
  },
  computed: {
    activeTabData() {
      return this.tabs.find(tab => tab.id === this.activeTab) || this.tabs[0];
    }
  },
  methods: {
    switchTab(tabId) {
      if (this.activeTab === tabId) return;
      this.activeTab = tabId;
      this.showMobileDropdown = false;
    },
    toggleMobileDropdown() {
      this.showMobileDropdown = !this.showMobileDropdown;
    },
    handleMobileTabClick(tabId) {
      this.switchTab(tabId);
    },
    searchItems() {
      console.log(`Searching ${this.activeTabData.title.toLowerCase()} for:`, this.searchQuery);
      // Implement actual search functionality here
    },
    editItem(item) {
      console.log('Editing item:', item);
      // Implement edit functionality here
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < 3) {
        this.currentPage++;
      }
    },
    goToPage(page) {
      this.currentPage = page;
    },
    saveChanges() {
      console.log('Saving changes');
      // Implement save functionality here
    }
  }
}
</script>

<style scoped>
.desktop-tab {
  transition: all 0.3s ease;
  cursor: pointer;
}

.desktop-tab.active-tab {
  background-color: white;
  color: #800000; /* USEP maroon color */
  font-weight: 600;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.mobile-dropdown-content {
  transition: all 0.3s ease;
}

.rotate-180 {
  transform: rotate(180deg);
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

table {
  border-radius: 20px;
}

@media (min-width: 768px) {
  .mobile-dropdown {
    display: none;
  }
  .desktop-tabs {
    display: block;
  }
}
</style>