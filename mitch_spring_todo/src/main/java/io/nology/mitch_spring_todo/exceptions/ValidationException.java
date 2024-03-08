package io.nology.mitch_spring_todo.exceptions;

public class ValidationException extends RuntimeException {

  private String fieldName;

  public ValidationException(String fieldName, String message) {
    super(
      String.format("Validation error for field '%s': %s", fieldName, message)
    );
    this.fieldName = fieldName;
  }

  public String getFieldName() {
    return fieldName;
  }
}
