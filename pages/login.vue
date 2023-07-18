<script lang="ts" setup>
const route = useRoute()
const router = useRouter()
const token = route.query.token ? String(route.query.token) : ''
if (token !== '' && process.client) {
    localStorage.setItem('authToken', token);
    router.replace('/') .then(() => {
        location.reload();
    });
}
</script>

<template>

</template>