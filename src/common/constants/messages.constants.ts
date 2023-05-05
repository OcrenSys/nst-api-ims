export const ONLY_ONE = true;

export const MODEL = Object.freeze({
  Banner: 'Banner',
  Brand: 'Brand',
  Category: 'Category',
  Credit: 'Credit',
  Customer: 'Customer',
  Image: 'Image',
  Logger: 'Logger',
  Member: 'Member',
  OrderDetail: 'Order Detail',
  Order: 'Order',
  PaymentDate: 'Payment Date',
  Payment: 'Payment',
  Percent: 'Percent',
  Person: 'Person',
  Product: 'Product',
  Role: 'Role',
  Section: 'Section',
  SubCategory: 'SubCategory',
  User: 'User',
  Variant: 'Variant',
});

export const ACTION_CREATE = Object.freeze({
  success: (model) => `${model} has been created successfully.`,
  error: (model) => `${model} has not been created.`,
});

export const ACTION_UPDATE = Object.freeze({
  success: (model) => `${model} has been updated successfully.`,
  error: (model) => `${model} has not been updated.`,
});

export const ACTION_DELETE = Object.freeze({
  success: (model) => `${model} has been deleted successfully.`,
  error: (model) => `${model} has not been deleted.`,
});

export const ACTION_REMOVE = Object.freeze({
  success: (model) => `${model} has been removed successfully.`,
  error: (model) => `${model} has not been removed.`,
});

export const ACTION_FIND = Object.freeze({
  success: (model, onlyOne?: boolean) =>
    `${model}${onlyOne ? '' : "'s list"} has been found successfully.`,
  error: (model, onlyOne?: boolean) =>
    `${model}${onlyOne ? '' : "'s list"} has not been found.`,
});
