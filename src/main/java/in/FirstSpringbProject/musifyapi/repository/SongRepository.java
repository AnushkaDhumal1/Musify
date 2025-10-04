package in.FirstSpringbProject.musifyapi.repository;

import in.FirstSpringbProject.musifyapi.document.Song;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SongRepository extends MongoRepository<Song,String> {

}