<template>
  <div class="flex min-h-screen relative">
    <!-- Sidebar -->
    <aside id="sidebar" class="fixed inset-y-0 left-0 w-64 bg-usepmaroon text-white shadow-lg transform -translate-x-full md:translate-x-0 transition-slow flex flex-col z-50">
      <div class="flex items-center justify-between px-6 border-b border-usepgold/50 h-[72px] relative">
        <div class="flex items-center gap-3">
          <img src="landing_page/images/usep-logo-small.png" alt="Logo" class="w-10 h-10 rounded md:w-12 md:h-12 transition-slow">
          <span class="text-xl md:text-2xl font-medium logo-text transition-slow">USeP Library</span>
        </div>
        <button id="closeBtn" class="md:hidden text-white hover:text-usepgold text-2xl transition-slow" @click="closeSidebar">
          <i class="fa-solid fa-xmark"></i>
        </button>
        <button id="toggleBtn" class="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 bg-usepmaroon text-usepgold border-2 border-usepgold w-8 h-8 rounded-full flex items-center justify-center transition-slow toggle-btn hover:bg-usepgold hover:text-usepmaroon" @click="toggleSidebar">
          <i class="fa-solid fa-chevron-left"></i>
        </button>
      </div>
      <nav class="flex-1 overflow-y-auto px-4 py-6 space-y-2 md:space-y-3 text-sm md:text-base">
        <p class="px-2 text-xs md:text-sm font-semibold uppercase text-usepgold tracking-wider mb-3 section-title">Home</p>
        <a href="#" id="dashboardBtn" class="nav-item flex items-center gap-3 px-3 py-2.5 md:py-3 rounded-lg hover:bg-usepmaroon/90 transition-slow" :class="{ 'active': activeMainMenu === 'dashboard' }" @click.prevent="showDashboard">
          <i class="fa-solid fa-gauge-high w-6 text-center text-usepgold md:text-xl"></i>
          <span class="nav-text font-medium md:text-lg">Dashboard</span>
        </a>

        <!-- Add with dropdown -->
        <div class="relative has-submenu">
          <a href="#" id="addMenuBtn" class="nav-item flex items-center justify-between px-3 py-2.5 md:py-3 rounded-lg hover:bg-usepmaroon/90 transition-slow" :class="{ 'active': activeMainMenu === 'add' }" @click.prevent="toggleSubmenu('addMenuBtn', true)">
            <div class="flex items-center gap-3">
              <i class="fa-solid fa-square-plus w-6 text-center text-white md:text-xl"></i>
              <span class="nav-text font-medium md:text-lg">Add</span>
            </div>
            <div class="flex items-center">
              <button class="chevron-btn text-xs ml-2">
                <i class="fa-solid" :class="submenus.addMenuBtn ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
              </button>
            </div>
          </a>
          <div class="submenu pl-4 space-y-1" :class="{ 'open': submenus.addMenuBtn }">
            <a href="#" class="add-submenu-item flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-usepmaroon/80 transition-slow" data-page="user" @click.prevent="loadAddContent('user')">
              <i class="fa-solid fa-user-plus w-5 text-center text-usepgold"></i>
              <span class="nav-text text-sm font-medium">User</span>
            </a>
            <a href="#" class="add-submenu-item flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-usepmaroon/80 transition-slow" data-page="school" @click.prevent="loadAddContent('school')">
              <i class="fa-solid fa-school w-5 text-center text-usepgold"></i>
              <span class="nav-text text-sm font-medium">School Information</span>
            </a>
          </div>
        </div>

        <!-- Update with dropdown -->
        <div class="relative has-submenu">
          <a href="#" id="updateMenuBtn" class="nav-item flex items-center justify-between px-3 py-2.5 md:py-3 rounded-lg hover:bg-usepmaroon/90 transition-slow" :class="{ 'active': activeMainMenu === 'update' }" @click.prevent="toggleSubmenu('updateMenuBtn', true)">
            <div class="flex items-center gap-3">
              <i class="fa-solid fa-pen-to-square w-6 text-center text-white md:text-xl"></i>
              <span class="nav-text font-medium md:text-lg">Update</span>
            </div>
            <div class="flex items-center">
              <button class="chevron-btn text-xs ml-2">
                <i class="fa-solid" :class="submenus.updateMenuBtn ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
              </button>
            </div>
          </a>
          <div class="submenu pl-4 space-y-1" :class="{ 'open': submenus.updateMenuBtn }">
            <a href="#" class="update-submenu-item flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-usepmaroon/80 transition-slow" data-page="updateUser" @click.prevent="loadUpdateContent('updateUser')">
              <i class="fa-solid fa-user-pen w-5 text-center text-usepgold"></i>
              <span class="nav-text text-sm font-medium">Update User</span>
            </a>
            <a href="#" class="update-submenu-item flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-usepmaroon/80 transition-slow" data-page="updateSchoolInfo" @click.prevent="loadUpdateContent('updateSchoolInfo')">
              <i class="fa-solid fa-school-flag w-5 text-center text-usepgold"></i>
              <span class="nav-text text-sm font-medium">Update School Info</span>
            </a>
          </div>
        </div>

        <!-- Accounts with dropdown -->
        <div class="relative has-submenu">
          <a href="#" id="accountsMenuBtn" class="nav-item flex items-center justify-between px-3 py-2.5 md:py-3 rounded-lg hover:bg-usepmaroon/90 transition-slow" :class="{ 'active': activeMainMenu === 'accounts' }" @click.prevent="toggleSubmenu('accountsMenuBtn', true)">
            <div class="flex items-center gap-3">
              <i class="fa-solid fa-user-gear w-6 text-center text-white md:text-xl"></i>
              <span class="nav-text font-medium md:text-lg">Accounts</span>
            </div>
            <div class="flex items-center">
              <button class="chevron-btn text-xs ml-2">
                <i class="fa-solid" :class="submenus.accountsMenuBtn ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
              </button>
            </div>
          </a>
          <div class="submenu pl-4 space-y-1" :class="{ 'open': submenus.accountsMenuBtn }">
            <a href="#" class="accounts-submenu-item flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-usepmaroon/80 transition-slow" data-page="manageAccounts" @click.prevent="loadAccountsContent('manageAccounts')">
              <i class="fa-solid fa-users-gear w-5 text-center text-usepgold"></i>
              <span class="nav-text text-sm font-medium">Manage Accounts</span>
            </a>
          </div>
        </div>
      </nav>
      <div class="px-4 py-4 border-t border-usepgold/30 mt-auto">
        <a href="#" class="flex items-center gap-3 text-usepgold hover:bg-usepgold/10 px-3 py-2.5 md:py-3 rounded-lg transition-slow">
          <i class="fa-solid fa-right-from-bracket w-6 text-center md:text-xl"></i>
          <span class="nav-text font-medium md:text-lg">Logout</span>
        </a>
      </div>
    </aside>

    <!-- Overlay - Only shows on mobile -->
    <div id="overlay" class="fixed inset-0 bg-black bg-opacity-50 hidden z-40 md:hidden transition-slow" :class="{ 'hidden': !mobileSidebarOpen }" @click="closeSidebar"></div>

    <!-- Main Content Area -->
    <div id="main-content" class="flex-1 flex flex-col md:ml-64 transition-slow" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
      <!-- Topbar -->
      <header class="sticky top-0 z-20 flex items-center justify-between bg-white border-b shadow px-6 h-[72px]">
        <div class="flex items-center gap-4">
          <button id="mobileMenuBtn" class="md:hidden text-usepmaroon hover:text-usepgold text-2xl transition-slow" @click="openSidebar">
            <i class="fa-solid fa-bars"></i>
          </button>
        </div>
        <div class="flex items-center gap-6">
          <button class="relative text-gray-600 hover:text-usepmaroon transition-slow">
            <i class="fa-solid fa-bell text-xl"></i>
            <span class="absolute -top-1 -right-2 bg-usepmaroon text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">3</span>
          </button>
          <div class="relative">
            <div id="profile-trigger" class="flex items-center gap-2 cursor-pointer" @click="toggleProfileDropdown">
              <img src="https://via.placeholder.com/40/800000/ffffff?text=JD" alt="User" class="w-8 h-8 rounded-full border-2 border-white shadow"/>
              <span class="hidden md:block font-medium text-usepmaroon">John Doe</span>
              <i class="fa-solid fa-chevron-down text-xs ml-1 text-usepmaroon"></i>
            </div>
            <div id="profile-dropdown" class="profile-dropdown absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50" :class="{ 'show': showProfileDropdown }">
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-usepgold/20 hover:text-usepmaroon transition-slow" @click.prevent="loadAccountSettings">
                <i class="fa-solid fa-user-cog mr-2"></i> Account Settings
              </a>
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-usepgold/20 hover:text-usepmaroon transition-slow" @click.prevent="loadHistory">
                <i class="fa-solid fa-clock-rotate-left mr-2"></i> Admin History
              </a>
            </div>
          </div>
        </div>
      </header>

      <!-- Main Content Container -->
      <main class="flex-1 p-6 bg-gradient-to-br from-gray-50 to-gray-100">
        <div id="content-container" class="h-full bg-white border border-gray-200 rounded-lg shadow-sm p-8 space-y-6">
          <!-- Dashboard Content -->
          <DashboardContent
              v-if="activeMainMenu === 'dashboard'"
              :currentView="currentView"
              @update-view="updateView"
              @update-chart="updateChartData"
          />

          <!-- Add Content -->
          <template v-else-if="activeMainMenu === 'add'">
            <UserForm v-if="activeSubMenu === 'user'" />
            <SchoolForm v-else-if="activeSubMenu === 'school'" />
          </template>

          <!-- Update Content -->
          <template v-else-if="activeMainMenu === 'update'">
            <UpdateUser v-if="activeSubMenu === 'updateUser'" />
            <UpdateSchoolInformation v-else-if="activeSubMenu === 'updateSchoolInfo'" />
          </template>

          <!-- Accounts Content -->
          <template v-else-if="activeMainMenu === 'accounts'">
            <ManageAccounts v-if="activeSubMenu === 'manageAccounts'" />
          </template>

          <!-- Profile Content -->
          <template v-else-if="activeMainMenu === 'accountSettings'">
            <AccountSettings />
          </template>

          <!-- History Content -->
          <template v-else-if="activeMainMenu === 'history'">
            <AdminHistory />
          </template>
        </div>
      </main>

      <footer class="bg-usepmaroon text-white py-2">
        <div class="container mx-auto px-2">
          <div class="flex flex-col items-center justify-center text-center space-y-2">
            <h3 class="text-2xl font-bold tracking-wide">USEP Library</h3>
            <p class="text-usepgold/90 text-lg">Tagum-Mabini Campus</p>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import DashboardContent from './DashboardContent.vue';
import UserForm from './UserForm.vue';
import SchoolForm from './SchoolForm.vue';
import UpdateUser from './UpdateUser.vue';
import UpdateSchoolInformation from './UpdateSchoolInformation.vue';
import ManageAccounts from './ManageAccounts.vue';
import AccountSettings from './AccountSettings.vue';
import AdminHistory from './AdminHistory.vue';

export default {
  name: 'Admin',
  components: {
    DashboardContent,
    UserForm,
    SchoolForm,
    UpdateUser,
    UpdateSchoolInformation,
    ManageAccounts,
    AccountSettings,
    AdminHistory
  },
  setup() {
    const sidebarCollapsed = ref(false);
    const mobileSidebarOpen = ref(false);
    const showProfileDropdown = ref(false);
    const activeMainMenu = ref('dashboard');
    const activeSubMenu = ref(null);
    const currentView = ref('monthly');
    const submenus = ref({
      addMenuBtn: false,
      updateMenuBtn: false,
      accountsMenuBtn: false
    });

    // Initialize Chart.js
    let borrowingChart = null;

    onMounted(() => {
      // Set current month as selected
      const currentMonth = new Date().getMonth() + 1;
      document.getElementById('month-selector').value = currentMonth;

      // Set current year as selected
      const currentYear = new Date().getFullYear();
      const yearSelector = document.getElementById('year-selector');
      if (!Array.from(yearSelector.options).some(option => option.value == currentYear)) {
        const option = document.createElement('option');
        option.value = currentYear;
        option.text = currentYear;
        yearSelector.insertBefore(option, yearSelector.firstChild);
      }
      yearSelector.value = currentYear;
    });

    const toggleSidebar = () => {
      sidebarCollapsed.value = !sidebarCollapsed.value;
    };

    const openSidebar = () => {
      mobileSidebarOpen.value = true;
      document.body.style.overflow = 'hidden';
    };

    const closeSidebar = () => {
      mobileSidebarOpen.value = false;
      document.body.style.overflow = '';
    };

    const toggleProfileDropdown = () => {
      showProfileDropdown.value = !showProfileDropdown.value;
    };

    const showDashboard = () => {
      activeMainMenu.value = 'dashboard';
      activeSubMenu.value = null;
      closeAllSubmenus();
    };

    const loadAddContent = (page) => {
      activeMainMenu.value = 'add';
      activeSubMenu.value = page;
      toggleSubmenu('addMenuBtn', true);
    };

    const loadUpdateContent = (page) => {
      activeMainMenu.value = 'update';
      activeSubMenu.value = page;
      toggleSubmenu('updateMenuBtn', true);
    };

    const loadAccountsContent = (page) => {
      activeMainMenu.value = 'accounts';
      activeSubMenu.value = page;
      toggleSubmenu('accountsMenuBtn', true);
    };

    const loadAccountSettings = () => {
      activeMainMenu.value = 'accountSettings';
      activeSubMenu.value = null;
      showProfileDropdown.value = false;
    };

    const loadHistory = () => {
      activeMainMenu.value = 'history';
      activeSubMenu.value = null;
      showProfileDropdown.value = false;
    };

    const toggleSubmenu = (menuId, forceOpen = false) => {
      if (forceOpen) {
        // Close all other submenus first
        Object.keys(submenus.value).forEach(key => {
          submenus.value[key] = false;
        });
        submenus.value[menuId] = true;
      } else {
        submenus.value[menuId] = !submenus.value[menuId];
      }
    };

    const closeAllSubmenus = () => {
      Object.keys(submenus.value).forEach(key => {
        submenus.value[key] = false;
      });
    };

    const updateView = (view) => {
      currentView.value = view;
    };

    const updateChartData = () => {
      // Chart update logic here
    };

    return {
      sidebarCollapsed,
      mobileSidebarOpen,
      showProfileDropdown,
      activeMainMenu,
      activeSubMenu,
      currentView,
      submenus,
      toggleSidebar,
      openSidebar,
      closeSidebar,
      toggleProfileDropdown,
      showDashboard,
      loadAddContent,
      loadUpdateContent,
      loadAccountsContent,
      loadAccountSettings,
      loadHistory,
      toggleSubmenu,
      updateView,
      updateChartData
    };
  }
};
</script>

<style scoped>
.transition-slow { transition: all 0.3s ease-in-out; }
.nav-item.active { background-color: rgba(255, 215, 0, 0.2); border-left: 3px solid #FFD700; }
#sidebar { z-index: 50; }
#overlay { z-index: 40; }
#profile-dropdown { z-index: 60; }
.sidebar-collapsed { width: 80px !important; }
.sidebar-collapsed .nav-text,
.sidebar-collapsed .section-title,
.sidebar-collapsed .logo-text,
.sidebar-collapsed .badge { display: none; }
.sidebar-collapsed .toggle-btn { left: 60px; }
.sidebar-collapsed ~ #main-content { margin-left: 80px !important; }
.has-submenu { position: relative; }
.submenu { max-height: 0; overflow: hidden; transition: max-height 0.3s ease; }
.submenu.open { max-height: 200px; }
.nav-item:hover { background-color: rgba(255, 215, 0, 0.2) !important; border-left: 3px solid #FFD700; }
.submenu a { display: block; }
.submenu a:hover { background-color: rgba(255, 215, 0, 0.2) !important; }
.profile-dropdown { display: none; opacity: 0; transform: translateY(-10px); transition: opacity 0.2s ease, transform 0.2s ease; }
.profile-dropdown.show { display: block; opacity: 1; transform: translateY(0); }
.chart-container { position: relative; height: 300px; }
.chevron-btn { pointer-events: auto; }
.chevron-btn:hover { color: #FFD700; }
</style>