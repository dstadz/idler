// 'use client'

// import React, { useState, useEffect } from 'react'

// const Crafter = ({ resourceSource, inputResource, outputResource, conversionRate }) => {
//   const [resources, setResources] = useState(mainResources)
//   const [isCrafting, setIsCrafting] = useState(false)

//   useEffect(() => {
//     if (isCrafting) {
//       const craftResource = async () => {
//         if (resources[inputResource] >= conversionRate) {
//           setResources((prevResources) => ({
//             ...prevResources,
//             [inputResource]: prevResources[inputResource] - conversionRate,
//             [outputResource]: (prevResources[outputResource] || 0) + 1,
//           }))
//           setTimeout(craftResource, 1000) // convert every 1 second
//         } else {
//           setIsCrafting(false)
//         }
//       }
//       craftResource()
//     }
//   }, [isCrafting, resources, inputResource, outputResource, conversionRate])

//   const startCrafting = () => {
//     setIsCrafting(true)
//   }

//   const stopCrafting = () => {
//     setIsCrafting(false)
//   }

//   return (
//     <div>
//       <button onClick={startCrafting}>Start Crafting</button>
//       <button onClick={stopCrafting}>Stop Crafting</button>
//       <p>Resources: {resources[inputResource]} / {resources[outputResource]}</p>
//     </div>
//   )
// }
// const CraftingPage = () => (
//   <div>
//     This is the Crafting Page Content
//   </div>
// )

// export default CraftingPage
