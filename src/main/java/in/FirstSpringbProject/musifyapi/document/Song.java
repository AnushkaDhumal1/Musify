package in.FirstSpringbProject.musifyapi.document;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "songs")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Song {

    @Id
    @JsonProperty
    private String id;
    private String name;
    private String desc;
    private String album;
    private String image;
    private String file;
    private String duration;
}
