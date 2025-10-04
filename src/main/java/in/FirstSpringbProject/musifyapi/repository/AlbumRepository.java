package in.FirstSpringbProject.musifyapi.repository;

import in.FirstSpringbProject.musifyapi.document.Album;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AlbumRepository extends MongoRepository<Album,String> {

}

