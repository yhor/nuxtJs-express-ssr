module.exports = {
  badRequest: (res, msg, err = null) => {
    if (err) {
      console.debug('err', err)
    };

    return res.status(400).json({
      success: false,
      message: msg,
    });
  },
  
  unAuthorized: (res, msg) => {
    return res.status(401).json({
      success: false,
      message: msg,
    });
  }
}