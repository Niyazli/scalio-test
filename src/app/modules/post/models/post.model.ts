import { BaseEntity } from '../../backend/models/base-entity.interface';

interface IPost extends BaseEntity {
  title: string;
  body: string;
}

export { IPost };
