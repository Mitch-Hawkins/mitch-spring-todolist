package io.nology.mitch_spring_todo.exceptions;

public class ResourceNotFoundException extends RuntimeException {

  private String resourceName;
  private Long resourceId;

  public ResourceNotFoundException(String resourceName, Long resourceId) {
    super(String.format("%s with id %d not found", resourceName, resourceId));
    this.resourceName = resourceName;
    this.resourceId = resourceId;
  }

  public ResourceNotFoundException(String resourceName, String message) {
    super(message);
    this.resourceName = resourceName;
  }

  public String getResourceName() {
    return resourceName;
  }

  public Long getResourceId() {
    return resourceId;
  }
}
