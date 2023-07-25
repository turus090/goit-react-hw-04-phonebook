const search = (name, searchInput) => {
    let nameLowerCase = name.toLowerCase()
    let searchLowerCase = searchInput.toLowerCase()
    return nameLowerCase.startsWith(searchLowerCase)
   }
   
   export default search