<template>
  <div id="add-content">
    <h2 class="text-2xl font-bold text-usepmaroon mb-4">Add</h2>
    <div class="desktop-tabs bg-gray-100 rounded-lg p-1 mb-6 overflow-hidden hidden md:block">
      <div class="flex">
        <button
            v-for="tab in tabs"
            :key="tab.id"
            :data-tab="tab.id"
            class="desktop-tab flex-1 py-3 px-4 text-center"
            :class="{ 'active-tab': activeTab === tab.id }"
            @click="switchTab(tab.id)"
        >
          <i :class="tab.iconClass" class="mr-2"></i>{{ tab.title }}
        </button>
      </div>
    </div>
    <div class="mobile-dropdown mb-6 block md:hidden">
      <button class="w-full bg-gray-100 py-3 px-4 rounded-lg flex justify-between items-center border border-gray-300" @click="toggleMobileDropdown">
        <span id="mobile-tab-label">
          <i :class="activeTabData.iconClass" class="mr-2"></i>{{ activeTabData.title }}
        </span>
        <i id="dropdown-chevron" class="fas fa-chevron-down transition-transform" :class="{ 'rotate-180': mobileDropdownOpen }"></i>
      </button>
      <div id="mobile-dropdown-content" class="mobile-dropdown-content bg-white border border-gray-200 rounded-b-lg shadow-sm" :class="{ 'hidden': !mobileDropdownOpen }">
        <button
            v-for="(tab, index) in tabs"
            :key="tab.id"
            :data-tab="tab.id"
            class="mobile-tab-option w-full text-left py-3 px-4 flex items-center border-b border-gray-100"
            @click="switchTab(tab.id); toggleMobileDropdown()"
        >
          <i :class="tab.iconClass" class="mr-3 text-usepmaroon"></i>{{ tab.title }}
          <span :id="'mobile-tab-' + (index + 1) + '-check'" class="ml-auto text-usepmaroon" :class="{ 'opacity-0': activeTab !== tab.id }">
            <i class="fas fa-check"></i>
          </span>
        </button>
      </div>
    </div>
    <div id="tab-content" class="p-4 border border-gray-200 rounded-lg">
      <h3 class="text-lg font-semibold text-usepmaroon mb-4">{{ activeTabData.title }} Form</h3>
      <div class="text-gray-600" v-html="activeTabData.content"></div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  name: 'AddContent',
  props: {
    activeSubMenu: String
  },
  setup() {
    const activeTab = ref('books');
    const mobileDropdownOpen = ref(false);

    const tabs = ref([
      {
        id: 'books',
        title: 'Books',
        iconClass: 'fas fa-book',
        content: `
        `
      },
      {
        id: 'electronic',
        title: 'Electronic',
        iconClass: 'fas fa-laptop-code',
        content: `
          <form class="space-y-6">
            <!-- Electronic form content -->
            <!-- ... -->
          </form>
        `
      },
      {
        id: 'periodical',
        title: 'Periodical',
        iconClass: 'fas fa-newspaper',
        content: `
          <form class="space-y-4">
            <!-- Periodical form content -->
            <!-- ... -->
          </form>
        `
      },
      {
        id: 'thesis',
        title: 'Thesis',
        iconClass: 'fas fa-graduation-cap',
        content: `
          <form class="space-y-4">
            <!-- Thesis form content -->
            <!-- ... -->
          </form>
        `
      }
    ]);

    const activeTabData = computed(() => {
      return tabs.value.find(tab => tab.id === activeTab.value) || tabs.value[0];
    });

    const switchTab = (tabName) => {
      if (activeTab.value === tabName) return;
      activeTab.value = tabName;
    };

    const toggleMobileDropdown = () => {
      mobileDropdownOpen.value = !mobileDropdownOpen.value;
    };

    return {
      activeTab,
      tabs,
      activeTabData,
      mobileDropdownOpen,
      switchTab,
      toggleMobileDropdown
    };
  }
};
</script>

<style scoped>
.desktop-tab {
  transition: all 0.3s ease;
  cursor: pointer;
}
.desktop-tab.active-tab {
  background-color: white;
  color: #800000;
  font-weight: 600;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
.mobile-dropdown-content {
  transition: all 0.3s ease;
}
.rotate-180 {
  transform: rotate(180deg);
}
@media (min-width: 768px) {
  .mobile-dropdown { display: none; }
  .desktop-tabs { display: block; }
}
</style>