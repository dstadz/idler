import { supabase } from "@/lib/supabase";

export const createNode = async ({ body }: { body: any }) => {
        const { data: { user }, error: authError } = await supabase.auth.getUser()

  console.log(`🚀`, body)
  const { data, error } = await supabase
    .from('nodes')
    .insert([
      { ...body,
        user_id: userId,
       },
    ])
    .select()
}

export const getNodes = async () => {
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  console.log(`🚀 ~ file: route.ts:21 ~ getNodes ~ user:`, user)

  let { data: nodes, error } = await supabase
    .from('nodes')
    .select("*")
    .eq('user_id', user.id)
  console.log(`🚀 ~ file: route.ts:25 ~ getNodes ~ nodes:`, nodes)

  return nodes
}
// Filters
// .eq('column', 'Equal to')
// .gt('column', 'Greater than')
// .lt('column', 'Less than')
// .gte('column', 'Greater than or equal to')
// .lte('column', 'Less than or equal to')
// .like('column', '%CaseSensitive%')
// .ilike('column', '%CaseInsensitive%')
// .is('column', null)
// .in('column', ['Array', 'Values'])
// .neq('column', 'Not equal to')
// Arrays
// .contains('array_column', ['array', 'contains'])
// .containedBy('array_column', ['contained', 'by'])


export const getUserId = async () => {
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  userId = user.id

  return userId
}


export const saveMap = async (hexCells) => {
  console.log('Saving map...')
  const { data: mapsData , error: mapsError } = await supabase
    .from('maps')
    .insert([{
      user_id: getUserId(),
      // name
      height: hexCells.length,
      width: hexCells[0].length
    }])
    .select('*')
    console.log({ mapsData, mapsError })

    const newTiles = []
    hexCells.forEach((row, rowIndex) => {
      row.forEach( async(cell, cellIndex) => {
        const cellDBbody = {
          ...cell,
          map_id: mapsData[0].id,
          position_x: cellIndex,
          position_y: rowIndex,
        }
        newTiles.push(cellDBbody)
      })
    })
    const { data: tilesData, error: tilesError } = await supabase
    .from('map_tiles').insert(newTiles)
    console.log(`🚀 :`, tilesData, tilesError)

    return { mapsData, tilesData, tilesData, tilesError }
}


export const saveBuildingSupabase = async (building) => {
  console.log(`🚀 ~ file: route.ts:87 ~ saveBuildingSupabase ~ building:`, building)
  // level,
  // status,
  // type,
  // position
  //

  const buildingBody = {
    // resources: JSON.stringify(building.resources),
    type: building.type,
    status: building.status,
    position_x: building.position[0],
    position_y: building.position[1],
    map_id: building.map_id,
    // ...building,
  }
  const { data: buildingsData, error: buildingsError } = await supabase
  .from('building_nodes')
  .insert([buildingBody])
  .select('*')

  return { buildingsData, buildingsError }
}
