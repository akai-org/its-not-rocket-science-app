import { Schema, Model, models, model } from 'mongoose'

export interface Category {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date
}

const categorySchema = new Schema<Category>(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
)

export const CategoryModel =
  (models.Category as Model<Category>) || model('Category', categorySchema)
