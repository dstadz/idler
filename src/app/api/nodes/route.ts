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
