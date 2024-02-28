package io.nology.mitch_spring_todo.tasks;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/tasks")
public class TaskController {

  @Autowired
  private TaskService taskService;

  @GetMapping
  public ResponseEntity<List<Task>> getAllTasks() {
    List<Task> allTasks = this.taskService.getAll();
    return new ResponseEntity<>(allTasks, HttpStatus.OK);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Task> getTaskById(@PathVariable Long id)
    throws NotFoundException {
    Optional<Task> maybeTask = this.taskService.findById(id);
    if (maybeTask.isPresent()) {
      Task foundTask = maybeTask.get();
      return new ResponseEntity<>(foundTask, HttpStatus.FOUND);
    } else {
      throw new NotFoundException();
    }
  }

  @PostMapping
  public ResponseEntity<Task> createTask(
    @Valid @RequestBody CreateTaskDTO data
  ) {
    Task createdTask = this.taskService.createTask(data);
    return new ResponseEntity<>(createdTask, HttpStatus.CREATED);
  }

  @PatchMapping("/{id}")
  public ResponseEntity<Task> updateTaskById(
    @Valid @RequestBody UpdateTaskDTO data,
    @PathVariable Long id
  ) throws NotFoundException {
    Optional<Task> maybeUpdatedTask = this.taskService.updateById(data, id);
    if (maybeUpdatedTask.isPresent()) {
      Task foundUpdatedTask = maybeUpdatedTask.get();
      return new ResponseEntity<>(foundUpdatedTask, HttpStatus.OK);
    } else {
      throw new NotFoundException();
    }
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Task> deleteTaskById(@PathVariable Long id)
    throws NotFoundException {
    boolean deleted = this.taskService.deleteById(id);
    if (!deleted) {
      throw new NotFoundException();
    }
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
}
