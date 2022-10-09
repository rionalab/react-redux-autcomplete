export const objIsEquals = (
   firstObj: Record<string, any>,
   secondObj: Record<string, any>
) => {
   return JSON.stringify(firstObj) === JSON.stringify(secondObj)
}
