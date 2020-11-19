class Portfolio {

  constructor(model, user) {
    this.Model = model;
    this.user = user;
    this.writeRights = ['instructor', 'admin'];
  }

  getAll() {
    return this.Model.find({})
  }

  getAllByUser() {
    this._checkAuth();

    return this.Model.find({ user: this.user._id}).sort({ startDate: 'desc' })
  }

  getById(id) {
    return this.Model.findById(id)
  }

  create(data) {
    this._checkAuth();
    data.user = this.user;

    return this.Model.create(data)
  }

  update(id, data) {
    return this.Model.findOneAndUpdate(
      { _id: id },
      data,
      { new: true, runValidators: true }
    )
  }

  delete(id) {
    return this.Model.findOneAndRemove({ _id: id });
  }

  _checkAuth() {
    if (!this.user || !this.writeRights.includes(this.user.role)) {
      throw new Error('Not Authorize');
    }
  }
}

module.exports = Portfolio;
