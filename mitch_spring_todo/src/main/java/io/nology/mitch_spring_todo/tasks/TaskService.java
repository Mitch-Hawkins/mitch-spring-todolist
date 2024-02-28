package io.nology.mitch_spring_todo.tasks;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class TaskService {

  @Autowired
  private TaskRepository repo;

  public List<Task> getAll() {
    return this.repo.findAll();
  }

  public Optional<Task> findById(Long id) {
    return this.repo.findById(id);
  }

  public Task createTask(@Valid CreateTaskDTO data) {
    Task newTask = new Task();
    newTask.setName(data.getName().trim());
    newTask.setDescription(data.getDescription().trim());
    newTask.setPriority(data.getPriority());
    newTask.setDueDate(data.getDueDate());
    return this.repo.save(newTask);
  }

  public Optional<Task> updateById(@Valid UpdateTaskDTO data, Long id) {
    Optional<Task> maybeTask = this.findById(id);
    if (maybeTask.isEmpty()) {
      return maybeTask;
    }
    Task foundTask = maybeTask.get();

    if (data.getName() != null) {
      foundTask.setName(data.getName().trim());
    }
    if (data.getDescription() != null) {
      foundTask.setDescription(data.getDescription().trim());
    }
    if (data.getDueDate() != null) {
      foundTask.setDueDate(data.getDueDate());
    }
    if (data.getPriority() < 1 || data.getPriority() > 5) {
      foundTask.setPriority(data.getPriority());
    }

    Task updated = this.repo.save(foundTask);
    return Optional.of(updated);
  }

  public boolean deleteById(Long id) {
    Optional<Task> maybeTask = this.repo.findById(id);
    if (maybeTask.isEmpty()) {
      return false;
    }
    this.repo.delete(maybeTask.get());
    return true;
  }
}
