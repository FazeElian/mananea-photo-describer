import { supabase } from './supabaseClient';

export async function uploadImage(file) {
  const fileName = `${Date.now()}_${file.name}`;

  const { data, error } = await supabase.storage
    .from('images') // nombre del bucket
    .upload(fileName, file);

  if (error) throw error;

  // obtener la URL pública
  const { data: publicUrlData } = supabase.storage
    .from('images')
    .getPublicUrl(fileName);

  return publicUrlData.publicUrl;
}
