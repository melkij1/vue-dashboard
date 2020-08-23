export function notify(types,text){
    this.$notify({
        group: 'foo',
        type: `${types}`,
        text: `${text}`
    })
}