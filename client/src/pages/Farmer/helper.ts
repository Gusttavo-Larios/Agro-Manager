export class FarmerHelper {
  static checkIfTheFieldIsWrong(
    reference?: string,
    referenceType: "string" | "number" | undefined = "string"
  ) {
    return typeof reference === referenceType;
  }
}
