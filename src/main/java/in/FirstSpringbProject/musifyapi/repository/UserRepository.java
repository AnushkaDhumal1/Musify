package in.FirstSpringbProject.musifyapi.repository;

import in.FirstSpringbProject.musifyapi.document.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String>{
    Optional<User> findByEmail(String email);

    Boolean existsByEmail(String email);
}
