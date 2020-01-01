import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

class RequestRow extends Component {
	onApprove = async () => {
		const campaign = Campaign(this.props.address);
		const accounts = await web3.eth.getAccounts();
		await campaign.methods.approveRequest(this.props.id).send({
			from: accounts[0]
		})
		.once('confirmation', (num, receipt) => {
			Router.replaceRoute(`/campaigns/${this.props.address}/requests`);
		});
	}

	onFinalize = async () => {
		const campaign = Campaign(this.props.address);
		const accounts = await web3.eth.getAccounts();
		await campaign.methods.finalizeRequest(this.props.id).send({
			from: accounts[0]
		})
		.once('confirmation', (num, receipt) => {
			Router.replaceRoute(`/campaigns/${this.props.address}/requests`);
		});
	}
	
	render() {
		const { Row, Cell } = Table;
		const { id, request, approversCount } = this.props;
		const approvalCount = web3.utils.hexToNumberString(request.approvalCount._hex);
		const cvApproversCount = web3.utils.hexToNumberString(approversCount._hex);
		const readyToFinalize = approvalCount > cvApproversCount / 2;
		
		return(
			<Row disabled={request.complete} positive={readyToFinalize && !request.complete}>
				<Cell>{id}</Cell>
				<Cell>{request.description}</Cell>
				<Cell>{web3.utils.fromWei(web3.utils.hexToNumberString(request.value._hex), 'ether')}</Cell>
				<Cell>{request.recipient}</Cell>
				<Cell>{approvalCount}/{cvApproversCount}</Cell>
				<Cell>
					{request.complete ? null : (
					<Button 
						color="green" 
						basic
						onClick={this.onApprove}
					>Approve</Button>
					)}
				</Cell>
				<Cell>
					{request.complete ? null : (
					<Button 
						color="teal"
						basic
						onClick={this.onFinalize}
					>Finalize</Button>
					)}
				</Cell>
			</Row>
		);
	}
}

export default RequestRow;