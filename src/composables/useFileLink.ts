const useFileLink = (file: any) => {
    return new Promise((resolve) => {
        const reader = new FileReader()
        
        reader.onload = function(event: any) {
            resolve(event.target.result)
        }
    
        reader.readAsDataURL(file)
    })
}

export default useFileLink
