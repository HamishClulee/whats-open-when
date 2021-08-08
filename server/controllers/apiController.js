class ApiController {
  todoRequest(_, res) {
    try {
      res.status(200).send({ message: "Api hit successfully." });
    } catch (e) {
      return res.send(500).send({ message: "Failure." });
    }
  }
}

export const apiController = new ApiController();
