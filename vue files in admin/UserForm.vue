<template>
  <div id="add-content" class="p-8 max-w-5xl mx-auto">
    <!-- Header Section with Upload Button -->
    <div class="flex justify-between items-start mb-8">
      <div>
        <h2 class="text-3xl font-bold text-usepmaroon">Add New User</h2>
        <p class="text-gray-500 mt-1">Complete all required fields</p>
      </div>

      <!-- Upload Button with File Preview -->
      <div class="flex flex-col items-end space-y-2">
        <label class="px-5 py-2.5 bg-usepgold text-usepmaroon rounded-lg hover:bg-usepgold/90 flex items-center cursor-pointer shadow-sm transition-all hover:shadow-md">
          <i class="fas fa-upload mr-2"></i>Upload File
          <input
              type="file"
              id="bulk-upload"
              class="hidden"
              accept=".csv,.pdf,.xlsx,.xls"
              @change="handleFileUpload"
          >
        </label>
        <div
            id="file-preview"
            class="file-card p-3 bg-white border border-gray-200 rounded-lg shadow-sm w-64"
            :class="{ 'hidden': !uploadedFile }"
        >
          <div class="flex justify-between items-center">
            <div class="flex items-center space-x-3">
              <div class="bg-usepgoldlight p-2 rounded-lg">
                <i class="fas fa-file text-usepmaroon"></i>
              </div>
              <div class="truncate">
                <h4 id="file-name" class="text-sm font-medium text-gray-800 truncate">{{ uploadedFile?.name }}</h4>
                <p id="file-size" class="text-xs text-gray-500">{{ formatFileSize(uploadedFile?.size) }}</p>
              </div>
            </div>
            <button
                @click="removeFile"
                class="remove-btn text-gray-400 hover:text-usepmaroon"
            >
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 rounded-xl shadow-usep">
      <!-- Left Column -->
      <div class="space-y-6">
        <div class="mb-8">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">Profile Details</h3>
          <div class="flex flex-col items-start space-y-4">
            <div class="profile-container relative group">
              <!-- Image Preview -->
              <div
                  id="image-preview"
                  class="relative"
                  :class="{ 'hidden': !profileImage }"
              >
                <img
                    id="preview-image"
                    :src="profileImage"
                    alt="Profile Preview"
                    class="w-32 h-32 rounded-full object-cover border-4 border-usepgold shadow-lg transform transition duration-300 group-hover:scale-105"
                >
                <button
                    @click="removeImage"
                    class="remove-btn absolute -top-2 -right-2 bg-usepmaroon text-white rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-red-700"
                >
                  <i class="fas fa-times text-sm"></i>
                </button>
              </div>
              <!-- Placeholder -->
              <div
                  id="image-placeholder"
                  class="w-32 h-32 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center shadow-inner border-2 border-dashed border-gray-300 hover:border-usepmaroon transition-colors"
                  :class="{ 'hidden': profileImage }"
              >
                <i class="fas fa-user text-gray-400 text-4xl"></i>
              </div>
            </div>
            <div class="flex space-x-3">
              <label class="px-4 py-2 bg-usepmaroon text-white rounded-lg hover:bg-usepmaroon/90 cursor-pointer flex items-center shadow-sm transition-all hover:shadow">
                <i class="fas fa-upload mr-2"></i>Upload new photo
                <input
                    type="file"
                    id="image-upload"
                    class="hidden"
                    accept="image/jpeg,image/png,image/gif"
                    @change="handleImageUpload"
                >
              </label>
              <button
                  @click="removeImage"
                  class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center shadow-sm transition-all hover:shadow"
              >
                <i class="fas fa-redo mr-2"></i>Reset
              </button>
            </div>
            <p class="text-sm text-gray-500">Allowed JPG, GIF or PNG. Max size of 2MB</p>
          </div>
        </div>

        <!-- Form Fields - Left Column -->
        <div class="space-y-5">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Patron Type</label>
            <select
                v-model="form.patronType"
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-usepmaroon focus:border-usepmaroon shadow-sm input-focus transition"
            >
              <option>Undergraduate</option>
              <option>Graduate School</option>
              <option>Faculty</option>
              <option>Staff</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">School ID Number</label>
            <input
                type="text"
                v-model="form.schoolId"
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-usepmaroon focus:border-usepmaroon shadow-sm input-focus transition"
            >
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Library ID Number</label>
            <input
                type="text"
                v-model="form.libraryId"
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-usepmaroon focus:border-usepmaroon shadow-sm input-focus transition"
            >
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
            <input
                type="text"
                v-model="form.cardNumber"
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-usepmaroon focus:border-usepmaroon shadow-sm input-focus transition"
            >
          </div>
        </div>
      </div>

      <!-- Right Column -->
      <div class="space-y-5">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Birthday</label>
          <input
              type="date"
              v-model="form.birthday"
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-usepmaroon focus:border-usepmaroon shadow-sm input-focus transition"
              placeholder="mm/dd/yyyy"
          >
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Gender</label>
          <select
              v-model="form.gender"
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-usepmaroon focus:border-usepmaroon shadow-sm input-focus transition"
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">First Name</label>
          <input
              type="text"
              v-model="form.firstName"
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-usepmaroon focus:border-usepmaroon shadow-sm input-focus transition"
          >
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Middle Name</label>
          <input
              type="text"
              v-model="form.middleName"
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-usepmaroon focus:border-usepmaroon shadow-sm input-focus transition"
          >
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
          <input
              type="text"
              v-model="form.lastName"
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-usepmaroon focus:border-usepmaroon shadow-sm input-focus transition"
          >
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
          <input
              type="email"
              v-model="form.email"
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-usepmaroon focus:border-usepmaroon shadow-sm input-focus transition"
          >
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
          <input
              type="tel"
              v-model="form.mobileNumber"
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-usepmaroon focus:border-usepmaroon shadow-sm input-focus transition"
          >
        </div>
      </div>
    </div>

    <!-- Save Button -->
    <div class="flex justify-end mt-8">
      <button
          @click="saveUser"
          class="px-8 py-3 bg-usepmaroon text-white rounded-lg hover:bg-usepmaroon/90 flex items-center shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
      >
        <i class="fas fa-save mr-2"></i>Save User
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'UserForm',
  setup() {
    const form = ref({
      patronType: '',
      schoolId: '',
      libraryId: '',
      cardNumber: '',
      birthday: '',
      gender: '',
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      mobileNumber: ''
    });

    const profileImage = ref(null);
    const uploadedFile = ref(null);

    const handleImageUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          profileImage.value = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    };

    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        uploadedFile.value = file;
      }
    };

    const removeImage = () => {
      profileImage.value = null;
    };

    const removeFile = () => {
      uploadedFile.value = null;
    };

    const formatFileSize = (bytes) => {
      if (!bytes) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const saveUser = () => {
      console.log('Saving user:', form.value);
      // Add API call to save user data
    };

    return {
      form,
      profileImage,
      uploadedFile,
      handleImageUpload,
      handleFileUpload,
      removeImage,
      removeFile,
      formatFileSize,
      saveUser
    };
  }
};
</script>

<style scoped>
.profile-container {
  transition: all 0.3s ease;
}
.profile-container:hover {
  transform: translateY(-2px);
}
.remove-btn {
  transition: all 0.2s ease;
}
.remove-btn:hover {
  transform: scale(1.1);
}
.file-card {
  transition: all 0.3s ease;
}
.file-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.input-focus:focus {
  box-shadow: 0 0 0 3px rgba(128, 0, 0, 0.2);
}
</style>