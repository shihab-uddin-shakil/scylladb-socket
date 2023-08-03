import { Injectable } from '@nestjs/common';
import { Client, mapping, auth } from 'cassandra-driver';

@Injectable()
export class CassandraService {
    client: Client;
    mapper: mapping.Mapper;
    private createClient() {
        this.client = new Client({
            contactPoints: ['localhost'],
            keyspace: 'user_demo',
            localDataCenter: 'datacenter1',
            authProvider: new auth.PlainTextAuthProvider('myuser', 'mypassword'),
            
        });
        
    }
    
    createMapper(mappingOptions: mapping.MappingOptions) {
     if(this.client == undefined) {
         this.createClient();
     }   
     return new mapping.Mapper(this.client, mappingOptions);
    }
}