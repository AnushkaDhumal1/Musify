package in.FirstSpringbProject.musifyapi.dto;

import in.FirstSpringbProject.musifyapi.document.Album;

import java.util.List;

public class AlbumListResponse {

    private boolean success;
    private List<Album> albums;


    public AlbumListResponse(boolean success, List<Album> albums) {
        this.success = success;
        this.albums = albums;
    }
    public boolean isSuccess() {
        return success;
    }

    public List<Album> getAlbums() {
        return albums;
    }
}
