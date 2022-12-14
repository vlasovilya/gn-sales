

export interface UserGoogleDrive {
  source_folder_id: string;
  dest_folder_id: string;
  files_list: string[];
  created_at: Date;
  synced_at: Date;
  google_username: string;
  source_folder_name: string;
  dest_folder_name: string;
  state: string;
}
