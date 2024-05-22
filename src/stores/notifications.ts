import { ref } from 'vue'
import { defineStore } from 'pinia'

const useNotifications = defineStore('notifications', () => {
	const notifications = ref<any[]>([
        // { id: 1, value: 'warning', text: 'Warning' },
        // { id: 2, value: 'danger', text: 'Danger' },
        // { id: 3, value: 'success', text: 'Success' },
        // { id: 4, value: 'primary', text: 'Primary' },
        // { id: 5, value: 'secondary', text: 'Secondary' }
    ])

    const setNotification = (event: any) => {
        notifications.value = [ { id: +new Date, ...event }, ...notifications.value ]
	}

    const removeNotification = (id: number) => {
        notifications.value = notifications.value.filter((el: any) => el?.id !== id)
    }

	return {
        notifications,
        setNotification,
        removeNotification
    }
})

export default useNotifications
