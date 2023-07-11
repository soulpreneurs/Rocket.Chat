import type { IPermission, IRole, RocketChatRecordDeleted } from '@rocket.chat/core-typings';
import type { IPermissionsModel } from '@rocket.chat/model-typings';
import type { Collection, Db } from 'mongodb';

import { BaseRaw } from './BaseRaw';

export class PermissionsRaw extends BaseRaw<IPermission> implements IPermissionsModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<IPermission>>) {
		super(db, 'permissions', trash);
	}

	async createOrUpdate(name: string, roles: IRole['_id'][]): Promise<IPermission['_id']> {
		const exists = await this.findOne(
			{
				_id: name,
				roles,
			},
			{ projection: { _id: 1 } },
		);

		if (exists) {
			return exists._id;
		}

		await this.updateOne({ _id: name }, { $set: { roles } }, { upsert: true });

		return name;
	}

	async create(id: string, roles: IRole['_id'][]): Promise<IPermission['_id']> {
		const exists = await this.findOneById(id, { projection: { _id: 1 } });
		if (exists) {
			return exists._id;
		}

		await this.updateOne({ _id: id }, { $set: { roles } }, { upsert: true });

		return id;
	}

	async addRole(permission: string, role: IRole['_id']): Promise<void> {
		await this.updateOne({ _id: permission, roles: { $ne: role } }, { $addToSet: { roles: role } });
	}

	async setRoles(permission: string, roles: IRole['_id'][]): Promise<void> {
		await this.updateOne({ _id: permission }, { $set: { roles } });
	}

	async removeRole(permission: string, role: IRole['_id']): Promise<void> {
		await this.updateOne({ _id: permission, roles: role }, { $pull: { roles: role } });
	}
}
