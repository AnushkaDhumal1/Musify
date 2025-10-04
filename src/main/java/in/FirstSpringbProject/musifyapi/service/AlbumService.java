package in.FirstSpringbProject.musifyapi.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import in.FirstSpringbProject.musifyapi.document.Album;
import in.FirstSpringbProject.musifyapi.dto.AlbumListResponse;
import in.FirstSpringbProject.musifyapi.dto.AlbumRequest;
import in.FirstSpringbProject.musifyapi.repository.AlbumRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AlbumService {
    private final AlbumRepository albumRepository;
    private final Cloudinary cloudinary;

    public Album addAlbum(AlbumRequest request) throws IOException {
        Map<String, Object> imageUploadResult = cloudinary.uploader().upload(request.getImageFile().getBytes(), ObjectUtils.asMap("resource_type","image"));
       Album newAlbum = Album.builder()
               .name(request.getName())
               .desc(request.getDesc())
               .bgColour(request.getBgColor())
               .imageUrl(imageUploadResult.get("secure_url").toString())
               .build();
       return albumRepository.save(newAlbum);
    }

    public AlbumListResponse getAllAlbums(){
       return new AlbumListResponse(true, albumRepository.findAll());
    }

    public Boolean removeAlbum(String id){
        Album existingAlbum =  albumRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Album not found"));
        albumRepository.delete(existingAlbum);
        return true;
    }
}
