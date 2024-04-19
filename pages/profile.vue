<script setup>
const supabase = useSupabaseClient();
const user = useSupabaseUser();
const uploading = ref(false);
const files = ref();

watch(() => {
  if (!user.value) {
    navigateTo("/");
  }
});
const uploadAvatar = async (evt) => {
  files.value = evt.target.files;
  try {
    uploading.value = true;

    if (!files.value || files.value.length === 0) {
      throw new Error("You must select an image to upload.");
    }

    const file = files.value[0];
    const fileExt = file.name.split(".").pop();
    const fileName = `${user.value?.id}${Math.floor(
      Math.random() * 10000000
    )}.${fileExt}`;
    const filePath = `${fileName}`;
    const oldPath = user.value.user_metadata.avatar_url.split("/");
    const { e } = await supabase.storage
      .from("avatars")
      .remove([oldPath[oldPath.length - 1]]);
    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file);
    const { data, error } = await supabase.auth.updateUser({
      data: {
        ...user.user_metadata,
        avatar_url: `https://plxdhhfpwdmwmhbiphkl.supabase.co/storage/v1/object/public/avatars/${filePath}`,
      },
    });
    if (uploadError) throw uploadError;
  } catch (error) {
    alert(error.message);
  } finally {
    uploading.value = false;
  }
};
</script>

<template>
  <div>
    <Navbar />
    <div class="profile-container">
      <UAvatar
        :src="user.user_metadata.avatar_url"
        alt="Avatar"
        size="3xl"
        :ui="{
          size: {
            '3xl': 'h-[200px] w-[200px] text-3xl',
          },
        }"
      />
      <div style="position: relative" class="text-white bottom-40 right-20">
        <label
          v-if="!uploading"
          for="single"
          class="cursor-pointer bg-[#4655e5] rounded-lg py-2 px-3 hover:bg-[#3e4cca] transition duration-200 ease-in flex gap-1 items-center"
        >
          <UIcon name="i-heroicons:pencil" />Изменить
        </label>
        <label
          v-else
          for="single"
          class="cursor-not-allowed bg-[#6473fa] rounded-lg py-2 px-3"
        >
          <UIcon name="i-svg-spinners:ring-resize" />
        </label>
        <input
          style="position: absolute; visibility: hidden"
          type="file"
          id="single"
          accept="image/*"
          @change="uploadAvatar"
          :disabled="uploading"
        />
      </div>
      <div class="profile-info">
        <p>{{ user.user_metadata.displayName }}</p>
        <p>{{ user.email }}</p>
        <UButton
          block
          color="primary"
          variant="ghost"
          size="xl"
          icon="i-heroicons-pencil-square"
          >Редактировать профиль</UButton
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.profile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  .profile-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    font: {
      weight: 500;
      size: 18px;
    }
    p:first-child {
      font: {
        weight: 600;
        size: 32px;
      }
    }
  }
}
</style>
