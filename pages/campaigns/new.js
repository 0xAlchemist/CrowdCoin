import React, { Component } from 'react';
import { Button, Form, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

class CampaignNew extends Component {
	state = {
		campaignName: '',
		minimumContribution: '',
		errorMessage: '',
		loading: false
	};

	onSubmit = async (event) => {
		event.preventDefault();

		this.setState({ loading: true, errorMessage: '' });

		try {
			const accounts = await web3.eth.getAccounts();
			await factory.methods
				.createCampaign(this.state.campaignName, this.state.minimumContribution)
				.send({ from: accounts[0] })
				.once('confirmation', (num, receipt) => {
					Router.pushRoute('/');
				});
		} catch (err) {
			this.setState({errorMessage: err.message});
		}

		this.setState({ loading: false });
	};

	render() {
		return(
			<Layout>
				<h3>Create a Campaign</h3>
				<Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
			    <Form.Field>
			      <label>Campaign Name</label>
			      <Input 
			      	type='text'
			      	placeholder='Campaign Name'
			      	value={this.state.campaignName}
			      	onChange={event => this.setState({campaignName: event.target.value})}
			      	/>
			    </Form.Field>
			    <Form.Field>
			      <label>Minimum Contribution</label>
			      <Input
			      	type='text'
			      	label='wei' 
			      	labelPosition='right'
			      	placeholder='100'
			      	value={this.state.minimumContribution}
			      	onChange={event => this.setState({minimumContribution: event.target.value})}
			      	/>
			    </Form.Field>
			    <Message error header="Oopsies!" content={this.state.errorMessage}/>
			    <Button 
			    	disabled={this.state.loading} 
			    	loading={this.state.loading} 
			    	primary
			    >Create Campaign</Button>
			  </Form>
			</Layout>
		);
	}
}

export default CampaignNew;