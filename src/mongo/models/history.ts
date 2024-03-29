import { Schema, Model, models, model } from 'mongoose'

export type HistoryLogType = 'added' | 'distributed' | 'removed' | 'modified'

export type ResourceType = 'item' | 'schema' | 'cartList'

export interface Resource {
  name: string
  type: ResourceType
  description?: string
  changedQuantity?: number
}

export interface HistoryLog {
  type: HistoryLogType
  id: string
  author: string
  resource: Resource
  createdAt: Date
  modifiedAt: Date
}

const HistoryResourceSchema = new Schema<Resource>({
  description: { type: String, required: false },
  type: { type: String, required: [true, 'Please, provide resource type'] },
  name: { type: String, required: [true, 'Please, provide resource name'] },
  changedQuantity: {
    type: Number,
    required: false,
    min: 1,
    max: 100000,
  },
})

const HistoryLogSchema = new Schema<HistoryLog>(
  {
    author: { type: String, required: [true, 'Author name must be provided'] },
    resource: HistoryResourceSchema,
    type: { type: String, required: [true, 'Please, provide log type'] },
  },
  { timestamps: true }
)

export const HistoryModel =
  (models.HistoryLog as Model<HistoryLog>) ||
  model('HistoryLog', HistoryLogSchema)
