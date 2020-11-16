class Portfolio {

  constructor(model, user) {
    this.Model = model;
    this.user = user;
  }

  getAll() {
    return this.Model.find({})
  }

  getById(id) {
    return this.Model.findById(id)
  }

  create(data) {
    if (!this.user) {
      throw new Error('Not Authorize');
    }
    data.user = this.user;
    return this.Model.create(data)
  }

  update(id, data) {
    return this.Model.findOneAndUpdate({ _id: id }, data, { new: true })
  }

  delete(id) {
    return this.Model.findOneAndRemove({ _id: id });
  }
}

module.exports = Portfolio;
